class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :omniauthable,
    omniauth_providers: %i[facebook google_oauth2]

  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :predictions

  def self.new_with_session(params, session)
    super.tap do |user|
      if (data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"])
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def self.from_omniauth(auth)
    user = User.where(email: auth.info.email).first_or_create! do |u|
      u.name = auth.info&.name || "Anonymous"
      u.password = Devise.friendly_token[0, 20]
    end
    user.update!(provider: auth.provider,
                 uid: auth.uid,
                 email: auth.info.email,
                 name: auth.info&.name || user.name || "Anonymous",
                 image: auth.info&.image&.gsub("http://", "https://") || ActionController::Base.helpers.asset_path("avatar.png")
    )
    user
  end
end
