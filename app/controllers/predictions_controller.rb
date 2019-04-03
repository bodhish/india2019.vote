class PredictionsController < ApplicationController
  def create
    prediction = Prediction.new
    if prediction.validate(permit_params.merge(user_id: User.last.id))
      prediction.save!
      redirect_to root_path(mock: true)
    else
      raise
    end
  end

  private

  def permit_params
    params.require(:prediction).permit(:answer_1, :answer_2, :answer_3, :answer_4, :answer_5, :coins_used)
  end
end
