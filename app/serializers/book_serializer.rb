class BookSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :author, :release_year, :max_copies, :available_copies
  has_many :book_users
  has_many :users, through: :book_users
end
