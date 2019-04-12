class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    if resource.is_a?(AdminUser)
      super
    else
      profile_path(current_user.reload.slug)
    end
  end
end
