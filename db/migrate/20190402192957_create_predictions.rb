class CreatePredictions < ActiveRecord::Migration[5.2]
  def change
    create_table :predictions do |t|
      t.references :user, foreign_key: true
      t.string :answer_1
      t.string :answer_2
      t.integer :answer_3
      t.integer :answer_4
      t.integer :answer_5
      t.integer :coins_used

      t.timestamps
    end
  end
end
