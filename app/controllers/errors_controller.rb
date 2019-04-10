class ErrorsController < ApplicationController
  def oauth_error
    error_message = @error_message || "error buhahahha"
  end
end
