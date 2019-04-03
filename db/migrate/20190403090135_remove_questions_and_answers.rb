class RemoveQuestionsAndAnswers < ActiveRecord::Migration[5.2]
  def change
    drop_table :answer_options
    drop_table :questions
  end
end
