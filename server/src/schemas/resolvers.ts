import User, { UserDocument } from "../models/User.js";
import { BookDocument } from "../models/Book.js";
import { signToken, AuthenticationError } from '../services/auth.js';

// Argument Types
interface LoginUserArgs {
    email: string;
    password: string;
}

interface NewUserArgs {
    username: string;
    email: string;
    password: string;
    // savedBooks: BookDocument[];
}

interface MyBooksArgs {
  _id: any;
  username: string;
}

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        getSingleUser: async (_parent: any, { _id, username }: MyBooksArgs): Promise<UserDocument | null> => {
            const params = _id ? { _id } : { username };
            return User.findOne({
              // $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
              $or: [{ _id: params._id }, { username: params.username }],
            });
        },
    },
    Mutation: {
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });
          
            // If no user is found, throw an AuthenticationError
            if (!user) {
              throw new AuthenticationError('Could not authenticate user.');
            }
          
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);
          
            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
              throw new AuthenticationError('Could not authenticate user.');
            }
          
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
          
            // Return the token and the user
            return { token, user };
        },
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (_parent: any, { username, email, password }: NewUserArgs) => {
            const user = await User.create({ username, email, password });
            console.log("New User:", user);
          
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (_parent: any, saveBookArgs: BookDocument, context: any) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: saveBookArgs } },
                { new: true, runValidators: true }
              );
              return updatedUser;
            }
            throw AuthenticationError;
        },
        // remove a book from `savedBooks`
        deleteBook: async (_parent: any, deleteBookArgs: BookDocument, context: any) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: deleteBookArgs.bookId } } },
              { new: true }
            );
            if (!updatedUser) {
                throw AuthenticationError;
            }
            return updatedUser;
        },
    },
};

export default resolvers;