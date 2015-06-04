class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :get_games

  def get_games
    @games = Game.order("score").limit(5).reverse
  end


# can use method .limit(5)  etc to limit the number of return if desired but
# does not work for high scores because highest score might not be in the 
# first 5 out. 
#
#
#   THIS WORKS BUT GIVES THE LOWEST 5 SCORES:
#    
#   def get_games
#    @games = Game.order("score").limit(5).reverse
#   end
#
#
#
#
#
#
end

