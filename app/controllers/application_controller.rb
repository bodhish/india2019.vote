class ApplicationController < ActionController::Base
  def after_sign_in_path_for(_resource)
    profile_path(current_user.slug)
  end
end
