# middlewares.py
import time


class SlowDownMiddleware(object):
    """suspends execution for 3 seconds
    """

    DELAY_IN_SECONDS = 3

    def process_request(self, request):
        time.sleep(self.DELAY_IN_SECONDS)
        return None
