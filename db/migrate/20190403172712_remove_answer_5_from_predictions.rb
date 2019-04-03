class RemoveAnswer5FromPredictions < ActiveRecord::Migration[5.2]
  def change
    remove_column :predictions, :answer_5
  end
end
