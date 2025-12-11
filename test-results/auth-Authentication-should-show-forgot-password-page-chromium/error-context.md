# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "WellWave" [ref=e4] [cursor=pointer]:
        - /url: /
        - img [ref=e5]
        - generic [ref=e7]: WellWave
    - main [ref=e8]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - heading "Esqueceu sua senha?" [level=2] [ref=e13]
          - paragraph [ref=e14]: Digite seu email e enviaremos um link para redefinir sua senha.
        - generic [ref=e15]:
          - generic [ref=e16]: Email
          - generic [ref=e17]:
            - img [ref=e18]
            - textbox "Email" [ref=e21]:
              - /placeholder: medico@hospital.com
        - button "Enviar link de recuperacao" [ref=e22] [cursor=pointer]
        - link "Voltar para o login" [ref=e23] [cursor=pointer]:
          - /url: /login
          - img
          - text: Voltar para o login
    - contentinfo [ref=e24]:
      - paragraph [ref=e25]: © 2025 WellWave. Todos os direitos reservados.
  - region "Notifications (F8)":
    - list
```