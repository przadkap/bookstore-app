module Api
  module V1
    class OpController < ApplicationController
      protect_from_forgery with: :null_session

      def lend_book
        user = User.find_by(id: params[:user_id])
        book = Book.find_by(id: params[:book_id])

        unless book.available_copies <= 0

          book_user = BookUser.new do |bu|
            bu.user_id = user.id
            bu.book_id = book.id
          end

          book_user.save

          book.available_copies -= 1
          book.save

        end

        render json: UserSerializer.new(user).serialized_json

      end

      def return_book
        user = User.find_by(id: params[:user_id])
        book = Book.find_by(id: params[:book_id])

        book_user = BookUser.find_by(user_id: params[:user_id], book_id: params[:book_id])

        book_user.destroy

        book.available_copies += 1
        book.save

        render json: UserSerializer.new(user).serialized_json
        # book_user = BookUser.find_by

      end
    end
  end
end
