ActiveAdmin.register Prediction do

  actions :index, :show

  filter :user_party_eq
  filter :user_state_eq
  filter :answer_1
  filter :answer_2
  filter :answer_3
  filter :answer_4
  filter :coins_used
  filter :private

  index do
    selectable_column

    column :user
    column :answer_1
    column :answer_2
    column :answer_3
    column :answer_4
    column :coins_used
    column :private

  end

  show do
    attributes_table do
      row :user
      row :answer_1
      row :answer_2
      row :answer_3
      row :answer_4
      row :coins_used
      row :private
    end
  end
end
