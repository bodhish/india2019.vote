class HomeController < ApplicationController

  def index
  end

  def profile
    @user = User.friendly.find(params[:slug])
  end
end
