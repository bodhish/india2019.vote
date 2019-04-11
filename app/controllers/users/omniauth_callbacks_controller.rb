module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def failure
      redirect_to oauth_error_path
    end

    def auth_callback
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.blank?
        redirect_to oauth_error_path
        return
      end

      sign_in_and_redirect @user, event: :authentication
    end

    def facebook
      if request.env["omniauth.auth"].info.email.blank?
        redirect_to "/users/auth/facebook?auth_type=rerequest&scope=email"

        return
      else
        auth_callback
      end
    end

    alias google_oauth2 auth_callback
  end
end
