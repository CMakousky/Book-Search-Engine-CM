import User, { UserDocument } from "../models/User";
import { BookDocument } from "../models/Book";
import { signToken } from '../services/auth.js';

const resolvers = {
    Query: {
        login: async (_parent: any, { username, email, password }:{ username: string, email: string, password: string }) => {
            const userCredentials = { username, email, password };
            const user = await User.findOne({ $or: [{ username: userCredentials.username }, { email: userCredentials.email }] });

            if (!user) {
              return res.status(400).json({ message: "Can't find this user" });
            }
          
            const correctPw = await user.isCorrectPassword(userCredentials.password);
          
            if (!correctPw) {
              return res.status(400).json({ message: 'Wrong password!' });
            }
            
            const token = signToken(user.username, user.email, user._id);
            return res.json({ token, user });
        },
        getSingleUser: async (_parent: any, { _id, username }:{ _id: string, username: string }): Promise<UserDocument | null> => {
            const params = _id ? { _id, username } : {};
            return User.findOne({
              $or: [{ _id: params._id }, { username: params.username }],
            });
        },
    },
    Mutation: {
        createUser: async (req: Request, res: Response) => {
            const user = await User.create(req.body);
          
            if (!user) {
              return res.status(400).json({ message: 'Something is wrong!' });
            }
            const token = signToken(user.username, user.password, user._id);
            return res.json({ token, user });
        },
        saveBook: async (req: Request, res: Response) => {
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $addToSet: { savedBooks: req.body } },
                { new: true, runValidators: true }
              );
              return res.json(updatedUser);
            } catch (err) {
              console.log(err);
              return res.status(400).json(err);
            }
        },
        deleteBook: async (req: Request, res: Response) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id },
              { $pull: { savedBooks: { bookId: req.params.bookId } } },
              { new: true }
            );
            if (!updatedUser) {
              return res.status(404).json({ message: "Couldn't find user with this id!" });
            }
            return res.json(updatedUser);
        },
    },
};

export default resolvers;