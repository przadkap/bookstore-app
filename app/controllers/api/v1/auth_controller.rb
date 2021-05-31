module Api
  module V1
    class AuthController < ApplicationController
      protect_from_forgery with: :null_session
      @@logged_in = false
      @@current_login = ""

      def status
        render json: {"logged_in": @@logged_in, "login": @@current_login}
      end

      def log_in
        user = User.find_by(login: params[:login])
        puts params
        if user.password == params[:password]
          @@logged_in = true
          @@current_login = user.login
          # render json: UserSerializer.new(user).serialized_json
          render json: {"logged_in": @@logged_in, "login": @@current_login}
        else
          head :no_content
        end
      end

      def log_out
        if @@logged_in
          @@logged_in = false
          @@current_login = ""
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
