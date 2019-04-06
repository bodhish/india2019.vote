class AddPrivateToPrediction < ActiveRecord::Migration[5.2]
  def change
    add_column :predictions, :private, :boolean, default: false
  end
end
