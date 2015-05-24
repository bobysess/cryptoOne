class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :set_default_response_format
  #before_action :checkTokenValidation
  protect_from_forgery with: :exception
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }
  #request.headers['Access-Token'];



  private
  def set_default_response_format
    request.format = :json
  end

  def checkTokenValidation
     token =  Token.find_by_token(request.headers['Access-Token'].to_s);
     if(!token or (Time.now - token.lastUpdate ) > 10.minutes )
        render :status => :unauthorized , :json => {error: " unauthentication" }.to_json
     else
        token.lastUpdate=Time.now
        token.save ;
     end
  end
end
