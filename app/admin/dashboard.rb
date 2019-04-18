ActiveAdmin.register_page 'Dashboard' do

  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  content title: proc { I18n.t('active_admin.dashboard') } do
    div class: 'blank_slate_container', id: 'dashboard_default_message' do
      span class: 'blank_slate' do
        h4 'Total Users Count: ' + "#{User.count}"
        h4 'Predictions Count: ' + "#{Prediction.count}"
        answer1 = Prediction.group(:answer_1).count
        answer2 = Prediction.group(:answer_2).count
        h4 'Party: NDA:  ' + "#{answer1["NDA"]}" + ',  UPA:  ' + "#{answer1["UPA"]}"
        h4 'PM: Narendra Modi:  ' + "#{answer2["Narendra Modi"]}" + ',  Rahul Gandhi:  ' + "#{answer2["Rahul Gandhi"]}"
        h4 'Average Seats for BJP  :' + "#{Prediction.average(:answer_3).floor}"
        h4 'Average Seats for CONG :' + "#{Prediction.average(:answer_4).floor}"
      end
    end
  end
end
