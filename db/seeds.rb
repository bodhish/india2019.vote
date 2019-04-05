require 'faker'

50.times do
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: 'password',
    password_confirmation: 'password'
  )
end

User.all.each do |user|
  2.times do
    answer_1 = ['BJP', 'Congress', 'NDA', 'UPA'].sample
    answer_2 = ['Narendra Modi', 'Rahul Gandhi', 'Mamata Banerjee', 'Arvind Kejriwal'].sample
    answer_3 = rand(543)
    answer_4 = 543 - answer_3
    coins_used = 200 + rand(300)
    Prediction.create!(
      user: user,
      answer_1: answer_1,
      answer_2: answer_2,
      answer_3: answer_3,
      answer_4: answer_4,
      coins_used: coins_used,
      created_at: 30.minutes.ago + rand(30).minutes
    )
  end
end
