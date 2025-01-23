import User from "../models/User";
// import { BookDocument } from "../models/Book";

const resolvers = {
    Query: {
        getSingleUser: async (_parent: any, { _id, username }:{ _id: string, username: string }) => {
            const params = _id ? { _id, username } : {};
            const user = { _id };
            return User.findOne({
              $or: [{ _id: user ? user._id : params._id }, { username: params.username }],
            });
        },
    },
    Mutation: {},
};

export default resolvers;