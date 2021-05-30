module Api
  module V1
    class AuthController < ApplicationController
      protect_from_forgery with: :null_session
      logged_in = false

      def index
        if @logged_in
          render json: {"logged_in": true}
        else
          render json: {"logged_in": false}
        end
      end

      def create
        user = User.find_by(login: params[:login])
        puts params
        if user.password == params[:password]
          logged_in = true
          render json: UserSerializer.new(user).serialized_json
        else
          head :no_content
        end
      end

      def destroy
        if @logged_in
          logged_in = false
        end

        head :no_content
      end

      private

      def user_params
        params.require(:user).permit(:login, :password)
      end
    end
  end
end
