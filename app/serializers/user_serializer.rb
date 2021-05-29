class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :login
  has_many :book_users
  has_many :books, through: :book_users
end
