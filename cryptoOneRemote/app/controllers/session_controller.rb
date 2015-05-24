class SessionController < ApplicationController
  skip_before_action :checkTokenValidation



  def login
     user = User.find_by_email(params[:email]);
     if user and user.password == params[:password]
        # retrieve user , generate token, save both in session , send both back to client
       # if not return  401 'the credentials are not correct'
       random_token = SecureRandom.urlsafe_base64(nil, false)
       token = Token.new(:token=> random_token , :lastUpdate => Time.now , :userId=> user.id)
       token.save
      # session[:token] = { :token => random_token , :last_update => Time.now }
       #session[:user]= user;
       reponse = {:user => user , :token => random_token}

       render  :json => reponse.to_json
     else
       render :json =>{:error=> ' false Credentials'}, :status => :unauthorized
     end
  end

=begin
  @proof

  def login
    require 'srp'

    prime_length = 1024
    a =params[:A]
    b=params[:B]
    m=params[:M]
    email =params[:email]
    user= User.find_by_email(email)
    v=user.verifier
    salt=user.salt
    proof= user.proof
    if(a)
      # Server generates challenge for the client.
      verifier = SRP::Verifier.new(prime_length)
      session =verifier.get_challenge_and_proof(email, v, salt, a)
      # Server has to persist proof to authenticate the client response.
      user.proof= session[:proof]
      user.save;
      # Server sends the challenge containing salt and B to client.
      # response = session[:challenge]
      render :json => session[:challenge]
    elsif(m)
      # New verifier may be instantiated on the server.
      verifier = SRP::Verifier.new(prime_length)

      # Verify challenge response M.
      # The Verifier state is passed in @proof.
      server_H_AMK = verifier.verify_session(proof, m)#client_M)
      # Is false if authentication failed.
      if server_H_AMK
          reponse = {:user => user , :token => random_token}
          render  :json => reponse.to_json
      else
          render :json =>{:error=> ' false Credentials', :server_H_AMK=> proof }, :status => :unauthorized
      end


      # At this point, the client and server should have a common session key
      # that is secure (i.e. not known to an outside party).  To finish
      # authentication, they must prove to each other that their keys are
      # identical.
    else
      render :json => "{erro : 1}".to_json
    end

  end
=end

  def logout
      session[:user]=nil;
      session[:token]=nil;
  end

  def generate_token

  end

end


