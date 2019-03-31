module Home
  class IndexPresenter < ApplicationPresenter
    def initialize(view_context)
      super(view_context)
    end

    # def react_props
    #   {
    #     userName: "Bodhish Thomas",
    #     userImage: "http://bodhish.in/assets/cortex-1.jpg"
    #   }
    # end

    def react_props
      {
        userName: current_user.name
        userImage: current_user.image
      }
    end
  end
end
