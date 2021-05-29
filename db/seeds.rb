# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {
    login: "store_admin",
    password: "store_admin"
  },
  {
    login: "bookworm",
    password: "bookworm"
  },
  {
    login: "bookworm1",
    password: "bookworm1"
  },
  {
    login: "bookworm2",
    password: "bookworm2"
  },
  {
    login: "bookworm3",
    password: "bookworm3"
  },
  {
    login: "bookworm4",
    password: "bookworm4"
  },
  ])

books = Book.create([
  {
    title: "The Lord Of The Rings",
    author: "J.R.R. Tolkien",
    release_year: 1954,
    max_copies: 10,
    available_copies: 10
  },
  {
    title: "1984",
    author: "George Orwell",
    release_year: 1949,
    max_copies: 15,
    available_copies: 15
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    release_year: 1945,
    max_copies: 12,
    available_copies: 12
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    release_year: 1997,
    max_copies: 30,
    available_copies: 30
  }
  ])
