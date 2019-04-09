module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    def react_props(user)
      {
        user: user_details(user),
        isCurrentUser: user == current_user,
        predictions: predictions(user),
        stats: stats,
        feedStart: feedStart,
        authenticityToken: view.form_authenticity_token,
      }
    end

    def feedStart
      predictions = Prediction.order(id: :desc)
      predictions = predictions.offset(5) if Prediction.count > 10
      predictions.limit(5).includes(:user).map do |p|
        {
          id: p.id,
          user_name: p.user_name,
          user_image: p.user_image,
          user_state: p.user_state,
          user_party: p.user_party,
          answer_1: p.answer_1,
          answer_2: p.answer_2,
          answer_3: p.answer_3,
          answer_4: p.answer_4,
          coins_used: p.coins_used,
          minutes_or_hours_ago: p.minutes_or_hours_ago,
        }
      end
    end

    private

    def user_details(user)
      {
        id: user.id,
        name: user.name,
        image: user.image,
        party: user.party,
        state: user.state,
        slug: user.slug,
      }
    end

    def predictions(user)
      predictions = (user == current_user) ? user.predictions : user.predictions.where(private: false)
      predictions.map do |prediction|
        {
          id: prediction.id,
          answer1: prediction.answer_1,
          answer2: prediction.answer_2,
          answer3: prediction.answer_3,
          answer4: prediction.answer_4,
          coinsUsed: prediction.coins_used,
        }
      end
    end

    def stats
      {
        party: {predictions_count: Prediction.group(:answer_1).count, coins_used: Prediction.group(:answer_1).sum(:coins_used)},
        primeMinister: {predictions_count: Prediction.group(:answer_2).count, coins_used: Prediction.group(:answer_2).sum(:coins_used)},
        bjpAvgSeats: Prediction.average(:answer_3).floor,
        congAvgSeats: Prediction.average(:answer_4).floor,
        total: Prediction.count,
      }
    end
  end
end
