module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    def react_props
      {
        userName: current_user.name,
        userImage: current_user.image,
        authenticityToken: view.form_authenticity_token,
        predictions: predictions
      }
    end

    def predictions
      current_user.predictions.map do |prediction|
        {
          id: prediction.id,
          answer1: prediction.answer_1,
          answer2: prediction.answer_2,
          answer3: prediction.answer_3,
          answer4: prediction.answer_4,
          coinsUsed: prediction.coins_used
        }
      end
    end
  end
end
