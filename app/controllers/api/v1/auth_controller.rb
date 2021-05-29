module Api
  module V1
    class AuthController < ApplicationController
      protect_from_forgery with: :null_session

      def create
        user = User.find_by(login: params[:login])
        # console.log(params)
        if user.password == params[:password]
          render json: UserSerializer.new(user).serialized_json
        else
          head :no_content
        end
      end

        private

        def user_params
          params.require(:user).permit(:login, :password)
        end
    end
  end
end
