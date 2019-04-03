class PredictionsController < ApplicationController
  def create
    prediction = Prediction.new(permit_params.merge(user_id: User.last.id))
    if prediction.save
      redirect_to profile_path(current_user.slug)
    else
      raise
    end
  end

  private

  def permit_params
    params.require(:prediction).permit(:answer_1, :answer_2, :answer_3, :answer_4, :answer_5, :coins_used)
  end
end
