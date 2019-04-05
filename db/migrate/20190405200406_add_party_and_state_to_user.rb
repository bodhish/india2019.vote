class AddPartyAndStateToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :party, :string
    add_column :users, :state, :string
  end
end
