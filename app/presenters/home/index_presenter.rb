module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    def react_props
      {
        userName: current_user.name,
        userImage: current_user.image,
        authenticityToken: view.form_authenticity_token
      }
    end
  end
end
