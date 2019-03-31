class Question < ApplicationRecord
  has_many :answer_options, dependent: :restrict_with_error
end
