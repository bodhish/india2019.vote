module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    # def react_props
    #   {
    #     userName: "Bodhish Thomas",
    #     userImage: "https://graph.facebook.com/v2.10/2771775329531107/picture",
    #   }
    # end

    def react_props
      {
        userName: current_user.name,
        userImage: current_user.image,
      }
    end
  end
end
