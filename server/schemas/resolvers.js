const { User } = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books');

                return userData;
            }

            throw new AuthenticationError('You must be logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const book = await User.create({ ...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: book._id } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You must be logged in!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const book = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: { bookId: args.bookId } } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You must be logged in!');
        }
    }
};

module.exports = resolvers;