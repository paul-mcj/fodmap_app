from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access')
        if not access_token:
            return None  # No cookie → anonymous

        try:
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token
        except (InvalidToken, AuthenticationFailed):
            # Bad cookie → ignore and treat as anonymous
            return None
