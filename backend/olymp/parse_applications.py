from openpyxl import load_workbook
from .factory import Factory

class ApplicationParser():
    @classmethod
    def parse_excel(cls, filename, olympiada, employee):
        wb = load_workbook(filename=filename)
        ws = wb.active
        # return cls.load_schools(ws)