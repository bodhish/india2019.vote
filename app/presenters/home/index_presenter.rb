module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    def react_props(user)
      {
        userName: user.name,
        userImage: user.image,
        authenticityToken: view.form_authenticity_token,
        predictions: predictions(user),
        isCurrentUser: user == current_user,
        stats: stats
      }
    end

    def predictions(user)
      user.predictions.map do |prediction|
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

    def stats
      {
        party: Prediction.group(:answer_1).count,
        primeMinister:  Prediction.group(:answer_2).count,
        bjpAvgSeats: Prediction.average(:answer_3).floor,
        congAvgSeats: Prediction.average(:answer_4).floor
      }
    end
  end
end
