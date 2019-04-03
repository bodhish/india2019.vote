class HomeController < ApplicationController

  def index
    if current_user
      redirect_to profile_path(current_user.slug)
      return
    end
  end

  def profile
    @user = User.friendly.find(params[:slug])
  end
end
