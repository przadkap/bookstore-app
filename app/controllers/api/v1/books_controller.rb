module Api
  module V1
    class BooksController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        books = Book.all

        render json: BookSerializer.new(books).serialized_json
      end

      def show
        book = Book.find_by(id: params[:id])

        render json: BookSerializer.new(book).serialized_json
      end


      def create
        book = Book.new(book_params)

        if book.save
          render json: BookSerializer.new(book).serialized_json
        else
          render json: {error: book.errors.messages}, status: 422
        end
      end

      def update
        book = Book.find_by(id: params[:id])

        if book.update(book_params)
          render json: BookSerializer.new(book).serialized_json
        else
          render json: {error: book.errors.messages}, status: 422
        end
      end

      def destroy
        book = Book.find(params[:id])

        if book.destroy
          head :no_content
        else
          render json: {error: book.errors.messages}, status: 422
        end
      end

      private

      def book_params
        params.require(:book).permit(:title, :author, :release_year, :max_copies, :available_copies)
      end
    end
  end
end
