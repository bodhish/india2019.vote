class AddQuestionsAndAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :value
      t.text :description

      t.timestamps
    end

    create_table :answer_options do |t|
      t.references :question, foreign_key: true
      t.string :value
      t.string :image

      t.timestamps
    end
  end
end

