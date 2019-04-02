module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    def react_props
      {
        userName: current_user.name,
        userImage: current_user.image,
        questions: questions
      }
    end

    def questions
      Question.all.map do |question|
        {
          id: question.id,
          value: question.value,
          answers: answer(question)
        }
      end
    end

    def answer(question)
      question.answer_options.map do |answer|
        {
          id: answer.id,
          value: answer.value
        }
      end
    end
  end
end
