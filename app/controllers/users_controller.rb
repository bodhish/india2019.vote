class UsersController < ApplicationController
  def update
    if current_user.present?
      current_user.state = permit_params[:state]
      current_user.party = permit_params[:party]
      if current_user.save
        redirect_to profile_path(current_user.slug)
      else
        raise
      end
    else
      raise
    end
  end

  private

  def permit_params
    params.require(:user).permit(:state, :party)
  end
end
