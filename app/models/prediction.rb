class Prediction < ApplicationRecord
  belongs_to :user

  validates_presence_of :answer_1, :answer_2, :answer_3, :answer_4, :answer_5, :coins_used
  validates :coins_used, presence: true, numericality: { greater_than: 199, less_than: 1001 }

  validate :seats_add_up

  def seats_add_up
    return if [answer_3, answer_4, answer_5].any?(&:blank?)

    errors.add('Seats don\t add upto 543') unless (answer_3 + answer_4 + answer_5 == 543)
  end
end
