ActiveAdmin.register User do
  actions :index, :show

  filter :email
  filter :name
  filter :party
  filter :state

  index do
    selectable_column

    column :email
    column :name
    column :party
    column :state
  end

  show do
    attributes_table do
      row :email
      row :name
      row :party
      row :state
    end
  end
end
