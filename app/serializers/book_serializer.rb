class BookSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :author, :release_year, :max_copies, :available_copies
end
