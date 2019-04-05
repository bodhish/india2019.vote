class PredictionsController < ApplicationController
  def create
    prediction = Prediction.new(permit_params.merge(user_id: current_user.id))
    if prediction.save
      redirect_to profile_path(current_user.slug)
    else
      raise
    end
  end

  def destroy
    Prediction.find(params[:id]).destroy
    redirect_to profile_path(current_user.slug)
  end

  def show
    prediction = Prediction.where('id > ?', params[:id]).first
    render json: prediction.as_json(
      only: %i(id answer_1 answer_2 answer_3 answer_4 coins_used),
      methods: :minutes_since
    )
  end

  private

  def permit_params
    params.require(:prediction).permit(:answer_1, :answer_2, :answer_3, :answer_4, :coins_used)
  end
end
