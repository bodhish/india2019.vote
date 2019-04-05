class Prediction < ApplicationRecord
  belongs_to :user

  validates_presence_of :answer_1, :answer_2, :answer_3, :answer_4, :coins_used
  validates :coins_used, presence: true, numericality: { greater_than: 199, less_than: 1001 }

  validate :seats_share

  def seats_share
    return if [answer_3, answer_4].any?(&:blank?)

    errors.add(:base, 'Invalid seats share') unless (answer_3 + answer_4) <= 543
  end

  def minutes_since
    ((Time.now - created_at)/1.minute).round
  end
end
