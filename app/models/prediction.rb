class Prediction < ApplicationRecord
  belongs_to :user

  validates_presence_of :answer_1, :answer_2, :answer_3, :answer_4, :coins_used
  validates :coins_used, presence: true, numericality: { greater_than: 199, less_than: 1001 }

  validate :seats_share

  def seats_share
    return if [answer_3, answer_4].any?(&:blank?)

    errors.add(:base, 'Invalid seats share') unless (answer_3 + answer_4) <= 543
  end

  def minutes_or_hours_ago
    time_diff = Time.now - created_at
    if created_at < 1.hour.ago
      hours = (time_diff/1.hour).round
      "#{hours} #{'hour'.pluralize(hours)} ago"
    else
      minutes = (time_diff/1.minute).round
      "#{minutes} #{'minute'.pluralize(minutes)} ago"
    end
  end
end
