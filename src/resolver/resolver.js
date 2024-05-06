const { authors, books } = require("../data/static");

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    book: (_, args) => books.find((book) => book.id == args.id),
    author: (_, args) => authors.find((author) => author.id == args.id),
  },
  Book: {
    author: (parent) => {
      return authors.find((author) => author.id == parent.authorId);
    },
  },
  Author: {
    books: (parent) => {
      return books.filter((book) => book.authorId == parent.id);
    },
  },
};

module.exports = resolvers;
