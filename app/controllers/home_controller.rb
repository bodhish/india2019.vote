class HomeController < ApplicationController
  def index
    @current_user = User.first if params[:mock]
  end
end
